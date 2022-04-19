package controllers

import (
	"github.com/kristabdi/Tubes3_13520058/models"
	"github.com/kristabdi/Tubes3_13520058/utils"
)

func DiseaseGetAll() []models.Disease {
	var diseases []models.Disease
	utils.Db.Find(&diseases)
	return diseases
}

func DiseaseGetOne() models.Disease {
	var disease models.Disease
	utils.Db.First(&disease)
	return disease
}

func DiseaseInsertOne(data *models.Disease) error {
	result := utils.Db.Create(data)
	return result.Error
}
