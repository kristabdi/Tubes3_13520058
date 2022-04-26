package handlers

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/kristabdi/Tubes3_13520058/controllers"
	"github.com/kristabdi/Tubes3_13520058/models"
	"github.com/kristabdi/Tubes3_13520058/utils"
	"gorm.io/gorm"
)

func DiseaseInsert(c *fiber.Ctx) error {
	var err error
	var query = new(models.Disease)
	if err = c.BodyParser(query); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Parsing error")
	}

	valid := utils.IsValidDNA(query.Sequence)
	if !valid {
		return c.Status(fiber.StatusBadRequest).SendString("Sequence invalid")
	}

	if _, err = controllers.DiseaseGetOne(query.Name); errors.Is(err, gorm.ErrRecordNotFound) {
		err = controllers.DiseaseInsertOne(query)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Disease Insert Error")
		}

		return c.SendStatus(fiber.StatusOK)
	} else {
		return c.Status(fiber.StatusBadRequest).SendString("Disease already in DB")
	}
}

func DiseaseMatch(c *fiber.Ctx) error {
	var err error
	query := new(models.QueryMatch)
	log.Println(query)
	if err = c.BodyParser(query); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Parsing error")
	}

	valid := utils.IsValidDNA(query.Sequence)
	if !valid {
		return c.Status(fiber.StatusBadRequest).SendString("Sequence invalid")
	}

	var disease models.Disease
	if disease, err = controllers.DiseaseGetOne(query.Penyakit); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).SendString("Penyakit not found")
		} else {
			return c.Status(fiber.StatusInternalServerError).SendString("Disease Get Error")
		}
	}

	var similar bool
	if c.Params("algo") == "bm" {
		similar = utils.BMMatch(query.Sequence, disease.Sequence)
	} else if c.Params("algo") == "kmp" {
		similar = utils.KMPMatch(query.Sequence, disease.Sequence)
	}

	var similarity float64
	if similar == false {
		// String similarity antara query.Sequence dengan disease.Sequence
		similarity = utils.CalculateSimiliarity(query.Sequence, disease.Sequence)
		if similarity >= 0.8 {
			similar = true
		} else {
			similar = false
		}
	} else {
		similarity = 1.0
	}

	history := models.History{
		Name:       query.Name,
		Penyakit:   disease.Name,
		Similarity: similarity,
		IsTrue:     similar,
		CreatedAt:  time.Now(),
	}

	if err = controllers.HistoryInsertOne(&history); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("History Insert Error")
	}

	var dateString string
	if dateString, err = utils.ConvertTime(history.CreatedAt); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Date string Error")
	}

	return c.Status(fiber.StatusOK).SendString(fmt.Sprintf("%s %s %s %.2f %t", dateString, history.Name, history.Penyakit, history.Similarity, history.IsTrue))
}

func HistoryQuery(c *fiber.Ctx) error {
	var err error
	var history []models.History

	query := new(models.QueryHistory)
	if err = c.BodyParser(query); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Parsing error")
	}

	if query.Date == "" {
		if history, err = controllers.HistoryGetByName(query.Name); err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return c.Status(fiber.StatusNotFound).SendString("History not found")
			} else {
				return c.Status(fiber.StatusInternalServerError).SendString("History Get Error")
			}
		}

		//return c.Status(fiber.StatusOK).SendString(fmt.Sprint(history.CreatedAt.Format("02 01 2006"), history.Name, history.Penyakit, history.Similarity, history.IsTrue))
	} else if query.Name == "" {
		if history, err = controllers.HistoryGetByDate(query.Date); err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return c.Status(fiber.StatusNotFound).SendString("History not found")
			} else {
				return c.Status(fiber.StatusInternalServerError).SendString("History Get Error")
			}
		}
	} else {
		if history, err = controllers.HistoryGetByAll(query.Name, query.Date); err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return c.Status(fiber.StatusNotFound).SendString("History not found")
			} else {
				return c.Status(fiber.StatusInternalServerError).SendString("History Get Error")
			}
		}
	}

	if len(history) <= 0 {
		return c.Status(fiber.StatusNotFound).SendString("History not found")
	}

	var output []string
	var dateString string

	for _, hist := range history {
		if dateString, err = utils.ConvertTime(hist.CreatedAt); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Date string Error")
		}

		output = append(output, fmt.Sprintf("%s %s %s %.2f %t", dateString, hist.Name, hist.Penyakit, hist.Similarity, hist.IsTrue))
	}

	return c.Status(fiber.StatusOK).JSON(output)
}