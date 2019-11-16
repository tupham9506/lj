import block from '@components/block';
import modeSelection from '@components/mode-selection';
export default {
  name: 'journey',
  components: {
    block,
    modeSelection
  },
  props: {
    user: Object,
  },
  data () {
    return {
      blocks: {},
      blockMode: 'months',
      lifePercent: 0,
      livedTimes: 0,
      totalTimes: 0
    }
  },
  computed: {

  },
  created () {
    this.createBlocks();
  },
  mounted () {

  },
  methods: {
    changeMode (mode) {
      this.blockMode = mode;
      this.createBlocks()
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

      // Statistic
      this.livedTimes = now.diff(startTime, this.blockMode);
      this.totalTimes = endTime.diff(startTime, this.blockMode);


      this.blocks[timeStr] = {
        time: timeStr,
        isPast: true
      };
      while (!endTime.isSame(startTime, this.blockMode)) {
        startTime.add(1, this.blockMode);
        timeStr = startTime.format('YYYY-MM-DD');
        this.blocks[timeStr] = {
          time: timeStr,
        };
        if(now.isAfter(startTime, 'days')) {
          this.blocks[timeStr].isPast = true;
        }
      }

      // Calc percent life
      this.lifePercent = Math.round(
        (this.$moment().get('years') - this.user.dob_year) * 100 * 100 / this.user.lifespan
      ) / 100;

      // this.getAllPost();
    },
    getAllPost () {
      this.$fb.api("/me/feed",
      {

      },
      function (response) {
        console.log("response", response);
        if (response && !response.error) {
          /* handle the result */
        }
      })
    }
  }
}


