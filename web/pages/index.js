
export default {
  name: 'index',
  layout: 'main',
  components: {},
  props: [],
  data () {
    return {
      account: '',
      password: '',
      errorMessage: {},
      isLoading: false,
      isLoginLoading: false,
      isRegLoading: false,
      isLoginFbLoading: false,
      mode: 'login',
      dob_day: null,
      dob_month: null,
      dob_year: null,
      lifespan: null
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    async register () {
      if(this.isLoading) return false;
      this.isLoading = 'register';
      let res = await this.request({
        url: '/api/register',
        method: 'post',
        data: {
          account: this.account,
          password: this.password,
          dob_day: this.dob_day,
          dob_month: this.dob_month,
          dob_year: this.dob_year,
          lifespan: this.lifespan
        }
      });
      this.handleLogin(res);
      this.isLoading = false;
    },
    async login () {
      if(this.isLoading) return false;
      this.isLoading = 'login';
      let res = await this.request({
        url: '/api/login',
        method: 'post',
        data: {
          account: this.account,
          password: this.password
        }
      });
      this.handleLogin(res);
      this.isLoading = false;
    },
    loginFb () {
      if(this.isLoading) return false;
      this.isLoading = 'loginFb';
      let accessToken, self = this;
      self.$fb.getLoginStatus(async function(response){
        if(response.status === 'connected') {
          return self.handleLoginFb(response.authResponse.accessToken);
        }
        // Login facebook
        self.$fb.login(function(response) {
          if(response.status === 'connected') {
            return self.handleLoginFb(response.authResponse.accessToken);
          }
          this.isLoading = false;
        }, { auth_type: 'reauthorize' })
      });
    },
    async handleLoginFb (accessToken) {
      let res = await this.request({
        url: '/api/login-fb',
        method: 'post',
        data: {
          access_token: accessToken
        }
      });
      this.handleLogin(res);
      this.isLoading = false;
    },
    handleLogin (res) {
      if(res.status != 200) {
        this.errorMessage = res.data.messages || {};
      } else {
        this.errorMessage = {};
        this.$store.commit('auth/saveAuth', res.data.user);
        this.$router.push(`/${res.data.user.account}`);
      }
    },
  }
}


