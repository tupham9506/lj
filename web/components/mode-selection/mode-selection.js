
export default {
  name: 'mode-selection',
  components: {},
  props: ['mode'],
  data () {
    return {
      modeList: [
        'days',
        // 'weeks',
        'months',
        'years'
      ],
      modeSelected: this.mode
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    selectMode () {
      this.$emit('change-mode', this.modeSelected);
    }
  }
}


