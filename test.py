import h5py

try:
    with h5py.File('Resources/model_trained.h5', 'r') as f:
        print("File opened successfully!")
except Exception as e:
    print("Error opening file:", e)
