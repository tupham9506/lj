import Vue from 'vue';

window.fbAsyncInit = function() {
  Vue.use(FB);
  Object.defineProperty(Vue.prototype, '$fb', { value: FB });
  Vue.prototype.$fb.init({
    appId      : '3518565694835449',
    cookie     : true,
    xfbml      : true,
    version    : 'v5.0'
  });
  Vue.prototype.$fb.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = 'js/fb-sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
