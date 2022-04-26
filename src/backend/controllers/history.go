package controllers

import (
	"fmt"
	"github.com/kristabdi/Tubes3_13520058/models"
	"github.com/kristabdi/Tubes3_13520058/utils"
	"time"
)

func HistoryInsertOne(data *models.History) error {
	result := utils.Db.Create(data)
	return result.Error
}

func HistoryGetByName(name string) ([]models.History, error) {
	var history []models.History
	if result := utils.Db.Where("penyakit = ?", name).Find(&history); result.Error != nil {
		return history, result.Error
	}
	return history, nil
}

func HistoryGetByDate(date string) ([]models.History, error) {
	var history []models.History
	var newDate string
	var dateInTime time.Time
	var err error
	newDate, err = utils.ConvertString(date)
	if err != nil {
		return history, err
	}
	dateInTime, err = time.Parse("02 01 2006", newDate)

	if err != nil {
		return history, fmt.Errorf("Invalid Date")
	}

	if result := utils.Db.Where("created_at = ?", dateInTime).Find(&history); result.Error != nil {
		return history, result.Error
	}
	return history, nil
}

func HistoryGetByAll(name string, date string) ([]models.History, error) {
	var history []models.History
	var newDate string
	var dateInTime time.Time
	var err error
	newDate, err = utils.ConvertString(date)
	if err != nil {
		return history, err
	}
	dateInTime, err = time.Parse("02 01 2006", newDate)
	if err != nil {
		return history, err
	}

	if result := utils.Db.Where("penyakit = ? AND created_at = ?", name, dateInTime).Find(&history); result.Error != nil {
		return history, result.Error
	}
	return history, nil
}
