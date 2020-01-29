import { mapState } from 'vuex';
import journey from '@components/journey';
import event from '@components/event';
export default {
  name: 'user',
  layout: 'main',
  components: {
    journey,
    event
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
    let account = this.$route.params.user;
    let time = this.$moment().format('YYYY-MM-DD');
    let mode = 'months';
    let res = await this.request({
      url: `/api/home?account=${account}&time=${time}&mode=${mode}`
    });
    if(res && res.data) {
      this.$store.commit('user/setUserAccount', res.data.user);
      this.$store.commit('event/setData', {
        eventList: res.data.eventList,
        eventCounter: res.data.eventCounter
      });
    }
  },
  mounted () {
  },
  methods: {
    test() {
      console.log(this);
    }
  }
}


