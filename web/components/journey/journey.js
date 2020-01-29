import block from '@components/block';
import modeSelection from '@components/mode-selection';
import event from '@components/event';
import avatar from '@components/avatar';
import { mapState } from 'vuex';

export default {
  name: 'journey',
  components: {
    avatar,
    block,
    modeSelection,
    event
  },
  props: {
    user: Object,
  },
  data () {
    return {
      blocks: {},
      lifePercent: 0,
      livedTimes: 0,
      totalTimes: 0,
      eventModal: false,
      blockView: null,
    }
  },
  computed: {
    ...mapState({
      blockMode: (state) => state.blockMode,
      blockSelected: (state) => state.blockSelected,
      eventCounter: (state) => state.event.eventCounter,
    })
  },
  created () {
    this.createBlocks();
  },
  mounted () {

  },
  watch: {
    eventCounter () {
      this.createBlocks();
    }
  },
  methods: {
    changeMode (mode) {
      this.$store.commit('update', { blockMode: mode });
      this.createBlocks();
    },
    createBlocks () {
      if(!this.user.dob_year || !this.user.dob_month || !this.user.dob_day) {
        return false;
      }
      this.blocks = {};
      let startTime = this.$moment([this.user.dob_year, (this.user.dob_month - 1), this.user.dob_day]);
      let endTime = this.$moment(startTime).add(this.user.lifespan, 'years');
      let now = this.$moment();
      let timeStr = startTime.format('YYYY-MM-DD');
      let timeStrByType = "";
      let count = 0;
      // Statistic
      this.livedTimes = now.diff(startTime, this.blockMode);
      this.totalTimes = endTime.diff(startTime, this.blockMode);
      let blockSelected = null;

      this.blocks[timeStr] = {
        time: timeStr,
        isPast: true
      };
      while (!endTime.isSame(startTime, this.blockMode)) {
        startTime.add(1, this.blockMode);
        timeStr = startTime.format('YYYY-MM-DD');
        timeStrByType = this.formatDateByType(timeStr, this.blockMode);
        count = 0;
        if(this.eventCounter[this.blockMode] && this.eventCounter[this.blockMode][timeStrByType]) {
          count = this.eventCounter[this.blockMode][timeStrByType];
        }
        this.blocks[timeStr] = {
          time: timeStr,
          count: count
        };

        if(now.isAfter(startTime, this.blockMode)) {
          this.blocks[timeStr].isPast = true;
        } else if(!blockSelected && now.isSame(startTime, this.blockMode)) {
          blockSelected = startTime.format('YYYY-MM-DD');
        }
      }

      // Calc percent life
      this.lifePercent = Math.round(
        (this.$moment().get('years') - this.user.dob_year) * 100 * 100 / this.user.lifespan
      ) / 100;

      // this.$store.commit('update', { blockSelected: blockSelected });
    },
    openEvent(item) {
      this.$store.commit('update', { blockSelected: item.time });
    },
    viewBlock (item) {
      this.blockView = item
    }
  }
}


