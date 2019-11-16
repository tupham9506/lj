
export default {
  name: 'avatar',
  components: {},
  props: {
    avatar: String,
    isAbsoluteAvatar: Number
  },
  data () {
    return {

    }
  },
  computed: {
    avatarStyle () {
      return {
        'background': `url(${this.avatar})`
      };
    }
  },
  mounted () {

  },
  methods: {

  }
}


