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

func DiseaseGetOne(name string) (models.Disease, error) {
	var disease models.Disease
	if result := utils.Db.Where("name = ?", name).First(&disease); result.Error != nil {
		return disease, result.Error
	}
	return disease, nil
}

func DiseaseInsertOne(data *models.Disease) error {
	result := utils.Db.Create(data)
	return result.Error
}
