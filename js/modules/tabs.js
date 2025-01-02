function tabs (tabContentSelector, tabItemSelector, tabParentsSelector, activeClass) {
   //* Tabs   

   const tabContent = document.querySelectorAll(tabContentSelector),
         tabItem = document.querySelectorAll(tabItemSelector),
         tabParents = document.querySelector(tabParentsSelector);

   const hideTabContent = () => {
      tabContent.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove('show')
      })
      tabItem.forEach(item => {
         item.classList.remove(activeClass);
      })
   }

   const showTabContent = (i = 0) => {
      tabContent[i].classList.add('show');
      tabContent[i].classList.remove('hide');
      tabItem[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabParents.addEventListener('click', (event) => {
      const target = event.target;
      tabItem.forEach((item, i) => {
         if (target === item) {
            hideTabContent();
            showTabContent(i);
            console.log(target);
            console.log(item);
            console.log(item === target);
         }
      })
   })
}

//module.exports = tabs;
export default tabs;