package handlers

import (
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/kristabdi/Tubes3_13520058/controllers"
	"github.com/kristabdi/Tubes3_13520058/models"
	"github.com/kristabdi/Tubes3_13520058/utils"
	"gorm.io/gorm"
)

func DiseaseGetAll(c *fiber.Ctx) error {
	diseases := controllers.DiseaseGetAll()
	return c.JSON(diseases)
}

func MatchDisease(c *fiber.Ctx) error {
	var err error
	query := new(models.QueryMatch)
	if err = c.BodyParser(query); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Parsing error")
	}

	valid := utils.IsValidDNA(query.Sequence)
	if valid == false {
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

	//TODO gunakan algo KMP dkk

	// String similarity antara query.Sequence dengan disease.Sequence
	similarity := utils.CalculateSimiliarity(disease.Sequence, query.Sequence)
	var similar bool
	if similarity >= 0.8 {
		similar = true
	} else {
		similar = false
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

	return c.Status(fiber.StatusOK).SendString(fmt.Sprint(history.CreatedAt.Format("02 01 2006"), history.Name, history.Penyakit, history.Similarity, history.IsTrue))
}
