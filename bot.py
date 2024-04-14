import os

l = ['jack', 'queen', 'king']
l2 = ['_of_diamond','_of_hearts','_of_spades','_of_clubs']

for i in l :
    for k in l2:
        old_name = f"C:\Users\Nikhil\OneDrive\Documents\VSCode\javascript course\subway passenger counter\PNG-cards-1.3{i+k}2"
        new_name = f"\PNG-cards-1.3\{i+k}" 
        print(old_name,new_name)
        # Renaming the file
        os.rename(old_name, new_name)   
        