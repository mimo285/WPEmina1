var Constants = {
  get_api_base_url: function () {
    if(location.hostname == 'localhost'){
      return "http://localhost:80/WPEmina/furni-backend/";
    } else {
      return "https://coral-app-mx3to.ondigitalocean.app/furni-backend/";
    }
  }
    //API_BASE_URL: "http://localhost:80/WPEmina/furni-backend/",
  };