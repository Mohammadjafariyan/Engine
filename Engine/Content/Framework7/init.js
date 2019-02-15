import * as Framework7 from "framework7";
import Searchbar from "framework7/components/searchbar/searchbar-class";
import Calendar from "framework7/components/calendar/calendar-class";
import Popup from "framework7/components/popup/popup-class";


Framework7.use([Searchbar, Calendar, Popup]);

// Init app
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/about/',
            url: 'about.html',
        },
    ],
    // ... other parameters
});