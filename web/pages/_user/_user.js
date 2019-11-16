import { mapState } from 'vuex';
import journey from '@components/journey';
import profile from '@components/profile';
export default {
  name: 'user',
  layout: 'main',
  components: {
    journey,
    profile
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    })
  },
  async created () {
    await this.$store.dispatch('user/getUserDetail', this.$route.params.user);
  },
  mounted () {
  },
  methods: {

  }
}


