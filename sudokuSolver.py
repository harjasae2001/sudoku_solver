
def isValid(board, row, col, c):
        # Check the row and column for the character 'c'
    for i in range(9):
        if board[row][i] == c:
            return False
        if board[i][col] == c:
            return False

            # Check the 3x3 sub-box
        if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == c:
            return False

    return True


def solve(board):
    # Iterate through the board to find an empty cell
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == 0:
                # Try placing digits from '1' to '9'
                for k in range(1, 10):
                    k_char = k
                    if isValid(board, i, j, k_char):
                        board[i][j] = k_char  # Place the digit

                        # Recursively attempt to solve the rest of the board
                        if solve(board):
                            return True
                        else:
                            board[i][j] = 0  # Reset if it didn't lead to a solution

                return False  # Return false if no digit can be placed

    return True  # Return true if the board is completely filled


def solveSudoku(board):
    solve(board)