# Find a Home for your Pokémon

What is it?
The purpose of our webpage is to find the nearest place near you that would suit a Pokémon.

By parsing through the various locations in a typical city, we have created a simple site that would cross-reference the information gained through the TomTom maps to find habitats that would suit various Pokémon’s from generation 1.

This is a fun website where Pokémon fans can find where their favorite Pokémon may flourish in real life. Which fan would not want that?

![](screenshot/1.PNG)      

## Mobile Responsive
![](screenshot/2.PNG)      


# How Does it work
Based on user input (name of Pokémon):

1. Reference the Pokemon API and return the Pokemon's image, name and habitat
2. Take the value of habitat and interpret it into our own search terms that aligns with google's search API
3. Cross-reference the habitat with the translated search term with the Google API and return a habitat result on the page.
4. Display the map of the habitat location on the web.

Habitat	Keyword

|-----------------------|-------------| 
| Cave                  | Escape Room |
| Forest/Grasslands     | Botanical   |   
| Mountain              | Bouldering  |  
| Rare                  | Attraction  |
| Rough-terrain         | centered    |   
| Sea	Rigging         | Fitness     |  
| Urban                 | City Center |
| Waters-edge           | Beach       |   


---

Live Site can be found [Here](https://tiffolin.github.io/Find-a-Home-for-my-Pokemon/)

---
## Authors
* **Tiffany Lin**         [Tiffolin](https://github.com/Tiffolin)

* **Chentao Tang**        [Saigonomai](https://github.com/Saigonomai)
* **4l3x1s**              [4l3x1s](4l3x1s)
* **Antoine Asselin**     [lebattebleu](https://github.com/Tiffolin)

---
## License
MIT
