import { mapState } from 'vuex';

export default {
  name: 'event',
  components: {},
  props: [],
  data () {
    return {
      eventContentHtml: '',
      eventContent: '',
      isLoading: false,
      selectedDate: new Date(),
      editMode: false,
      eventId: null
    }
  },
  computed: {
    ...mapState({
      blockMode: (state) => state.blockMode,
      blockSelected: (state) => state.blockSelected,
      eventList: (state) => state.event.eventList,
    })
  },
  mounted () {
    this.$set(this, 'selectedDate', new Date(this.blockSelected));
  },
  watch: {
    // Change date
    async blockSelected() {
      this.$set(this, 'selectedDate', new Date(this.blockSelected));
      this.isLoading = 'eventList';
      await this.getEventList();
      this.isLoading = false;
    }
  },
  methods: {
    selectDate (date) {
      this.selectedDate = date;
    },
    updateContent (event){
      this.eventContent = event.target.innerText;
    },
    async getEventList() {
      await this.$store.dispatch('event/getEventList', {
        time: this.$moment(this.selectedDate).format('YYYY-MM-DD'),
        mode: this.blockMode
      });
    },
    async submit () {
      this.isLoading = 'submit';
      await this.$store.dispatch('event/save', {
        content: this.eventContent,
        time: this.$moment(this.selectedDate).format('YYYY-MM-DD'),
        image: null,
        permission: 1,
        id: this.eventId
      });
      await this.getEventList();
      this.cancelEditEvent();
    },
    editEvent (event) {
      this.editMode = true;
      this.eventContentHtml = this.eventContent = event.content;
      this.selectedDate = new Date(event.time);
      this.eventId = event.id;
    },
    cancelEditEvent () {
      this.isLoading = false;
      this.editMode = false;
      this.eventContentHtml = this.eventContent = null;
      this.eventId = null;
    }
  }
}


