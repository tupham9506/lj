
export default {
  name: 'avatar',
  components: {},
  props: {
    avatar: String,
    isAbsoluteAvatar: Number,
    width: {
      default: 50,
      type: Number
    },
    height: {
      default: 50,
      type: Number
    }
  },
  data () {
    return {

    }
  },
  computed: {
    avatarStyle () {
      let avatar = this.avatar || require('~/assets/images/default-avatar.jpg')
      return {
        'background': `url(${avatar})`,
        'backgroundSize': 'cover',
        'height': `${this.height}px`,
        'width': `${this.width}px`
      };
    }
  },
  mounted () {

  },
  methods: {

  }
}


