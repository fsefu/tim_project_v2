import csv


def generate_csv(lists_data, segments_data):
  
    csv_file = "Lists_and_Segements_Data.csv"

    # Writing data to CSV file
    with open(csv_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)

        # Write header for FirstData
        writer.writerow(["All Lists"])
        writer.writerow(lists_data.keys())
        writer.writerows(zip(*lists_data.values()))

        # Add empty rows to create a visual separator
        writer.writerow(["", "", ""])

        # Write header for SecondData
        writer.writerow(["All Segements"])
        writer.writerow(segments_data.keys())
        writer.writerows(zip(*segments_data.values()))

    print("Data has been written to", csv_file)
