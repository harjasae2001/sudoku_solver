import numpy as np
import psycopg2

print('Setting Up')
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from utils import *
import sudokuSolver

def read_image_from_db():
    try:
        # Connect to the PostgreSQL database
        connection = psycopg2.connect(
            # host="your_host",
            database="imageDB",
            user="postgres",
            password="Best!@#4"
        )
        cursor = connection.cursor()

        # Query to fetch the image data
        query = "SELECT pic_byte FROM image_table WHERE id = %s"
        cursor.execute(query, (1,))  # Replace '1' with the appropriate ID or condition

        # Fetch the image data
        image_data = cursor.fetchone()[0]

        # Save the image to a file
        with open("Resources/1.jpg", "wb") as file:  # Change the file extension as needed
            file.write(image_data)

        print("Image has been saved as '1.jpg'.")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Close the database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Call the function
read_image_from_db()

pathImage = "Resources/1.jpg"
heightImg = 450
widthImg = 450
model = initializePredictionModel()
# if model is None:
#     print("Failed to load the model. Exiting.")
#     exit(1)  # Or handle the error as appropriate


# print(model)

#### 1. Preparing the image
img = cv2.imread(pathImage)
img = cv2.resize(img, (widthImg, heightImg))
imgBlank = np.zeros((heightImg, widthImg, 3), np.uint8)
imgThreshold = preprocess(img)
# cv2.imshow('img', imgThreshold)


#### 2. Find all contours
imgContours = img.copy()
imgBigContour = img.copy()
contours, hierarchy = cv2.findContours(imgThreshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(imgContours, contours, -1, (0, 255, 0), 3)


#### 3. Find the biggest contour and use it for sudoku
biggest, maxArea = biggestContour(contours)
# print(biggest)
if biggest is not None:
    biggest = reorder(biggest)
    print(biggest)
    cv2.drawContours(imgBigContour, biggest, -1, (0, 255, 0), 25)
    pts1 = np.float32(biggest)
    pts2 = np.float32([[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgWarpColored = cv2.warpPerspective(img, matrix, (widthImg, heightImg))
    imgDetectedDigits = imgBlank.copy()
    imgWarpColored = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)

#### 4. Split the image and find each digit available
    imgSolvedDigits = imgBlank.copy()
    boxes = splitBoxes(imgWarpColored)
    numbers = getPrediction(boxes, model)
    imgDetectedDigits = displayNumbers(imgDetectedDigits, numbers, color=(255, 0, 255))
    numbers = np.asarray(numbers)
    posArray = np.where(numbers > 0, 0, 1)


#### 5. Find the solution of the board
    board = np.array_split(numbers, 9)
    try:
        sudokuSolver.solveSudoku(board)
    except:
        pass

    flatlist = []
    for sublist in board:
        for item in sublist:
            flatlist.append(item)
    solvedNumbers = flatlist*posArray
    imgSolvedDigits = displayNumbers(imgSolvedDigits, solvedNumbers, color=(0, 255, 0))

#### 6. Overlay solution
    pts2 = np.float32(biggest)
    pts1 = np.float32([[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgInvWarpColored = img.copy()
    imgInvWarpColored = cv2.warpPerspective(imgSolvedDigits, matrix, (widthImg, heightImg))
    inv_perspective = cv2.addWeighted(imgInvWarpColored, 1, img, 0.5, 1)
    imgDetectedDigits = drawGrid(imgDetectedDigits)
    imgSolvedDigits = drawGrid(imgSolvedDigits)

    imageArray = ([img, imgContours, imgBigContour, imgWarpColored], [imgWarpColored, imgDetectedDigits, imgBlank, imgBlank])

    # stackedImage = stackImages(imageArray, 0.75)
    cv2.imshow("detected_digits", imgDetectedDigits)
    cv2.imshow("solved_digits", imgSolvedDigits)
    cv2.imshow("inv_warpeed_Colored", imgInvWarpColored)
    cv2.imshow("solved image", inv_perspective)
else:
    print("No solution found")

cv2.waitKey(0)