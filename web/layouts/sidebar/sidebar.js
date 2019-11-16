import avatar from '@components/avatar';
import { mapState } from 'vuex';

export default {
  name: 'sidebar',
  components: {
    avatar
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
    })
  },
  mounted () {
  },
  methods: {
    logout () {
      this.$store.commit('auth/removeAuth');
      this.$router.push('/');
    }
  }
}


