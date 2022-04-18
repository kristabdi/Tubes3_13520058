package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kristabdi/Tubes3_13520058/controllers"
)

func GetAll(c *fiber.Ctx) error {
	reminders := controllers.DiseaseGetAll()
	return c.JSON(reminders)
}
