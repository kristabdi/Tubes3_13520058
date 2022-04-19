package utils

import "fmt"

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func calculateSimiliarity(disease string, dna string) float64 {
	var ratio float64 = 0
	var count int = 0
	var lenDisease = len(disease)
	var lenDna = len(dna)
	var totallength int = lenDisease + lenDna

	var matrix = make([][]int, lenDisease+1)
	for i := range matrix {
		matrix[i] = make([]int, lenDna+1)
	}

	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix[i]); j++ {
			// Fill matrix with zero
			matrix[i][j] = 0
		}
	}

	for i := 1; i < len(matrix); i++ {
		for j := 1; j < len(matrix[i]); j++ {
			matrix[i][0] = i
			matrix[0][j] = j
		}
	}

	for i := 1; i < len(matrix); i++ {
		for j := 1; j < len(matrix[i]); j++ {
			if disease[i-1] == dna[j-1] {
				count = 0
			} else {
				count = 2
			}
			matrix[i][j] = min(matrix[i-1][j]+1, matrix[i][j-1]+1)
			matrix[i][j] = min(matrix[i-1][j-1]+count, matrix[i][j])
		}
	}

	var lastElement int = matrix[lenDisease][lenDna]
	ratio = float64((totallength - lastElement)) / float64(totallength)
	fmt.Printf("Ratio func : %f", ratio)
	return ratio
}
