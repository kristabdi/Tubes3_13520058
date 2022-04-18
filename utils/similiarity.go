package utils


func Min(vars ...int) int {
    min := vars[0]

    for _, i := range vars {
        if min > i {
            min = i
        }
    }

    return min
}

func calculate_similiarity(disease string, dna string) int {
	var ratio int = 0
	var count int = 0
	var lenDisease = len(disease)
	var lenDna = len(dna)
	var totallength int = lenDisease + lenDna
	var matrix = make([][]int, lenDisease)
	for i := range matrix {
		matrix[i] = make([]int, lenDna)
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
            matrix[i][j] = Min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i][j], matrix[i-1][j-1] + count)
        }
    }

	var lastElement int  = matrix[lenDisease+1][lenDna+1]
	ratio = (totallength - lastElement) / totallength
	return ratio
}