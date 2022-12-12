from bs4 import BeautifulSoup
import requests, csv, cloudinary

def img_scraper(link):

    page_counter = 1
 
    for page_counter in range(1,11):
        url = link
        if page_counter == 1:
            f = csv.writer(open('img_data.csv', 'w'))                                      # create a csv file
            f.writerow(['Img_link', 'Location']) 
        else:
            url += f"?page={str(page_counter)}"

        print(url)
        page_counter += 1

        page = requests.get(url)                                                       # make a get request 
        soup = BeautifulSoup(page.text, "lxml")                                        # parse the page's html content                                                                          

        html_content = soup.find(class_='col-lg-10 col-md-9 col-sm-8')                 # desired section in html

        img_info_list = html_content.find_all(class_='card cdr-card photo-cdr-card')   # desired subsection in html as list

        for img_info_item in img_info_list:
            img_item = img_info_item.find('img')
            img_link = img_item.get('data-original')
            location_item = img_info_item.find_all(class_='location')
            for location in location_item:
                location_text = location.text
                # print(location_text[-2:])
                f.writerow([img_link, location_text])
    
    return print("Completed")
 
test = "https://www.hikingproject.com/featured/photos/newest"
img_scraper(test)
        





