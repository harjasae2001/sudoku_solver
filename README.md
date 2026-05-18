# Sudoku Solver (Computer Vision + CNN)

This project detects a Sudoku puzzle from an image, recognizes digits using a trained CNN, solves the puzzle, and overlays the solution back onto the image.

## Project Layout

- `sudokuMain.py`: End-to-end pipeline that reads an image (optionally from PostgreSQL), detects the board, runs digit recognition, solves the puzzle, and shows the overlay.
- `sudokuMain2.py`: Alternate pipeline using `utils2.py` helper functions.
- `sudokuSolver.py`: Backtracking Sudoku solver.
- `utils.py`: Image preprocessing, contour detection, digit extraction, and rendering helpers.
- `utils2.py`: Alternate set of image utilities used by `sudokuMain2.py`.
- `Resources/model_trained.h5`: Trained CNN model for digit recognition.

## Prerequisites

- Python 3.9+ recommended
- A working camera or image file for testing
- (Optional) PostgreSQL if using the image-from-DB flow in `sudokuMain.py`

## Setup

1. Create and activate a virtual environment.

2. Install dependencies.

```bash
pip install numpy opencv-python tensorflow psycopg2 h5py
```

If you are on Windows and `psycopg2` fails, use:

```bash
pip install psycopg2-binary
```

## Running The App

### Option A: Run With Local Image

1. Put an image named `1.jpg` (or update the filename) in `Resources/`.
2. Update the path in the script:
   - `sudokuMain.py` uses `pathImage = "Resources/1.jpg"`
   - `sudokuMain2.py` uses `pathImage = "Resources/1.jpeg"`
3. Run either script:

```bash
python sudokuMain.py
```

or

```bash
python sudokuMain2.py
```

You should see OpenCV windows showing the detected digits, solved digits, and the final overlay.

### Option B: Run With Image From PostgreSQL

`sudoMain.py` (typo: `sudokuMain.py`) includes a helper to fetch an image from PostgreSQL and save it to `Resources/1.jpg`.

To use it:

1. Ensure your DB has a table with an image byte column (see `read_image_from_db` in `sudokuMain.py`).
2. Update the DB connection settings in `sudokuMain.py`:
   - `database`
   - `user`
   - `password`
   - `host` (if not local)
3. Run:

```bash
python sudokuMain.py
```

Note: Do not commit real credentials. Use environment variables or a local config file if you need to store secrets.

## How It Works (High Level)

1. Preprocess the image (grayscale, blur, adaptive threshold).
2. Find the biggest contour and warp it into a square.
3. Split into 81 cells and run the CNN to recognize digits.
4. Solve the Sudoku using backtracking.
5. Overlay the solved digits back onto the original image.

## Troubleshooting

- If no Sudoku is found, try a clearer image with higher contrast.
- If TensorFlow fails to load the model, verify `Resources/model_trained.h5` exists and matches your TF version.
- If the prediction threshold seems too strict, check the `getPrediction`/`getPredection` logic in the utils files.
- OpenCV windows might not appear in some IDEs; run from a terminal.

## Development Notes

- `utils.py` and `utils2.py` are slightly different implementations. Stick to one pipeline for consistency.
- The solver (`sudokuSolver.py`) operates on a 9x9 array of integers with zeros as blanks.

## Tests

No automated tests are included yet. If you add tests, consider unit tests for:

- Sudoku solver correctness
- Image preprocessing and contour selection
- Digit classifier output shape and thresholds

## License

No license file is included. Add a `LICENSE` if you plan to share or distribute the project.
