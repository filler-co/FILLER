
# Table of Contents 
You can link to the different sections below



# Product Description

FILLER Co. is proud to present our latest project, a modernized e-commerce interface developed for a fashion and design business. FILLER was tasked with adapting and modernizing our clients outdated retail portal into a sleek and updated site that prioritizes user experience. Sections such as product details, ratings & reviews, and questions & answers have undergone a complete redesign.

<p align="center">
<img width="70" alt="Screen Shot 2022-12-09 at 10 42 14 PM" src="https://user-images.githubusercontent.com/64453175/208267640-b1871f6a-e24f-4240-9e11-3e5db89002ce.png">
</p>



# Overview 
A brief description outlining what the project


### PRODUCT DETAILS
The Product Details module shows relevant information for a single product in the catalog. Its functionality can be divided into several pieces:
 - Image Gallery
 - Product Information
 - Style Selector
 - Add to Cart

<p align="center">
<img width="748" height="399"  src="https://user-images.githubusercontent.com/64453175/208263735-327471e5-98fd-46fc-9711-3e738d9ff39f.gif">
</p>



### RATINGS & REVIEWS
The Ratings & Reviews module will allow viewing and submission of reviews for the product selected. The functionality contained within this module can be divided into several pieces:
 - Write new review
 - Reviews List
 - Sorting 
 - Rating Breakdown
 - Product Breakdown

<p align="center">
<img width="747" height="532"  src="https://user-images.githubusercontent.com/114783607/208258468-18dc5738-62ee-47a1-81aa-615dc9c27c0a.gif">
</p>


### QUESTIONS & ANSWERS 
The Questions & Answers module will allow asking and answering of questions for the product selected. The functionality contained within this module can be divided into several pieces:
  - View questions
  - Search for a question
  - Asking a question
  - Answering a question
  
<p align="center">
<img width="747" height="532"  src="https://user-images.githubusercontent.com/3084586/208255936-9d4b1bdc-bab0-4f93-98f1-25c165a89ce8.gif">
</p>


# Detailed Overview 
A more detailed outline of the project. What does it do? Is there a high level list of features? If describing a project that has visual features, consider adding pictures or animations of the features and functionality in this section. See Adding Screen Captures below.

## Product Details

### Theme Selector
 - Used ThemeProvider wrapper component from React's Styled-Components library to automatically provide a globalTheme prop to all nested React components.
 - Leveraged global prop with Ternary and Logical && operators to dynamically style specific features.

![FILLER_theme](https://user-images.githubusercontent.com/64453175/208257058-7636af62-264a-48e5-a965-8eaf58f8d56e.gif)

### Style Select & Image Gallery
 - Used React states to track displayed image, image gallery positions, and selected style.

![FILLER_StylesGallery](https://user-images.githubusercontent.com/64453175/208256043-d043ba4c-bcb0-48e7-aa50-b05251547cfd.gif)

### Expanded View & Zoom Mode
 - Used React's onMouseMove mouse event to track cursor. Cursor coordinates were obtained via mouse event's pageX and pageY properties.
 - Used cursor coordinates in conjunction with the window's innerHeight and innerWidth properties to create dynamic coordinates that were passed into the Translate CSS function of the Transform CSS property

![FILLER_zoomMode](https://user-images.githubusercontent.com/64453175/208256560-915badca-bd1a-4404-9500-ac536f11b240.gif)

### Dropdowns and Buttons
 - Used React states to track dropdown values.
 - Used localStorage to persist favorites-list through multiple sessions.


![FILLER_sizeStock](https://user-images.githubusercontent.com/64453175/208256826-aea829ee-3ca1-42de-8800-6e217fa15dd9.gif)


# Installation 
  To **build** and install all the dependencies
```
  npm install 
```

  To start **frontend** 
 ```
  npm run react-dev 
```
  To start **backend** 
 ```
  npm run server-dev 
```

  To **test** 
  ```
  npm run test 
```
  To check test **coverage**
  ```
  npm run test-coverage
  ```


# Technologies Used 
  - Frontend 
    - React 
    - Styled Component 
    - Webpack, Babel  

  - Backend
    - Express 
    - Node.js
    - Axios
    - Multer

  - Test 
    - Jest, React Testing Library
     
  - Deployment 
    - AWS

# Team Members 
Add the names of your team members. Describe roles on the team such as "Product Owner", "Scrum Master" and more.
<p align="center">
<a href="https://github.com/palmigloo"><kbd><img width="175" alt="Abigail" src="https://user-images.githubusercontent.com/3084586/208263347-363a0895-7ede-40f6-8f82-83434178ed66.png"></kbd></a>
<a href="https://github.com/svemi"><kbd><img width="175" alt="Sai" src="https://user-images.githubusercontent.com/3084586/208263354-569cfe2c-1ebc-4f14-ac58-68abbf701dc6.png"></kbd></a>
<a href="https://github.com/kylemartinelli"><kbd><img width="175" alt="Kyle" src="https://user-images.githubusercontent.com/3084586/208263384-b764f421-aee0-44a9-93a5-f1abe3910f24.png"></kbd></a>
</p>

# Roadmap 
What future enhancements are planned? What is the current status of the project? Is it being actively maintained?

# License 
If open source, state how the project is licensed.


https://github.com/matiassingers/awesome-readme.
