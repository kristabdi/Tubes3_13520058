package utils

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func ConvertTime(time time.Time) (string, error) {
	year, month, day := time.Date()

	var bulan string
	switch month {
	case 1:
		bulan = "Januari"
	case 2:
		bulan = "Februari"
	case 3:
		bulan = "Maret"
	case 4:
		bulan = "April"
	case 5:
		bulan = "Mei"
	case 6:
		bulan = "Juni"
	case 7:
		bulan = "Juli"
	case 8:
		bulan = "Agustus"
	case 9:
		bulan = "September"
	case 10:
		bulan = "Oktober"
	case 11:
		bulan = "November"
	case 12:
		bulan = "Desember"
	default:
		bulan = "Unknown"
	}

	if bulan == "Unknown" {
		return "", fmt.Errorf("Date convert error")
	}

	return fmt.Sprint(strconv.Itoa(day) + " " + bulan + " " + strconv.Itoa(year)), nil
}

func ConvertString(date string) (string, error) {
	var newDate string
	dateSlice := strings.Fields(date)

	switch dateSlice[1] {
	case "Januari":
		dateSlice[1] = "01"
	case "Februari":
		dateSlice[1] = "02"
	case "Maret":
		dateSlice[1] = "03"
	case "April":
		dateSlice[1] = "04"
	case "Mei":
		dateSlice[1] = "05"
	case "Juni":
		dateSlice[1] = "06"
	case "Juli":
		dateSlice[1] = "07"
	case "Agustus":
		dateSlice[1] = "08"
	case "September":
		dateSlice[1] = "09"
	case "Oktober":
		dateSlice[1] = "10"
	case "November":
		dateSlice[1] = "11"
	case "Desember":
		dateSlice[1] = "12"
	default:
		dateSlice[1] = "Unknown"
	}

	if dateSlice[1] == "Unknown" {
		return newDate, fmt.Errorf("Invalid Date")
	}

	newDate = fmt.Sprint(dateSlice[0] + " " + dateSlice[1] + " " + dateSlice[2])
	return newDate, nil
}