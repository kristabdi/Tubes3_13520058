package controllers

import (
	"github.com/kristabdi/Tubes3_13520058/models"
	"github.com/kristabdi/Tubes3_13520058/utils"
)

func HistoryInsertOne(data *models.History) error {
	result := utils.Db.Create(data)
	return result.Error
}
