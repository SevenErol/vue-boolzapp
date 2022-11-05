
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            activeIndex: 0,
            newMessageSent: {
                date: '04/11/2022 15:00:00',
                message: '',
                status: 'sent'
            },
            newMessageReceived: {
                date: '04/11/2022 15:00:00',
                message: null,
                status: 'received'
            },
            searchValue: '',
            lastContactInfo: [],
            randomPhrase: [
                "Io diventerò re dei pirati!",
                "tu sei chi scegli e cerchi di essere",
                "eh si mò me lo segno",
                "Questa piccola parte della mia vita può chiamarsi felicità"
            ],
            online: false,
            writing: "Sta scrivendo..."
        }
    },

    computed: {
        contactsList() {

            if (this.searchValue.trim().length > 0) {

                return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()))

            }

            return this.contacts
        }
    },

    methods: {
        setActiveIndex(index) {
            this.activeIndex = index

        },

        async sendMessage() {

            if (this.newMessageSent.message !== '' && this.newMessageSent.message.replace(/\s/g, '').length > 0) {

                this.contactsList[this.activeIndex].messages.push(this.newMessageSent)

                this.lastContactInfo[this.activeIndex] = this.newMessageSent

                this.newMessageSent = {
                    date: '04/11/2022 15:00:00',
                    message: '',
                    status: 'sent'
                }

                this.online = true

                setTimeout(this.receiveMessage, 1000)

            }

            this.newMessageSent.message = ''

            await nextTick(this.scrollDown())

        },

        async receiveMessage() {

            this.newMessageReceived.message = this.randomPhrase[Math.floor(Math.random() * (this.randomPhrase.length - 0) + 0)]

            this.contactsList[this.activeIndex].messages.push(this.newMessageReceived)

            this.lastContactInfo[this.activeIndex] = this.newMessageReceived

            this.newMessageReceived = {
                date: '04/11/2022 15:00:00',
                message: '',
                status: 'received'
            }

            this.writing = "Online"

            setTimeout(this.lastAccess, 6000)

            await nextTick(this.scrollDown())
            
        },

        lastAccess() {

            this.online = false

            this.writing = "Sta scrivendo..."

        },

        deleteMessage(index) {

            this.contacts[this.activeIndex].messages[index].message = "Questo messaggio è stato eliminato"

            // this.lastContactInfo[this.activeIndex] = this.contactsList[this.activeIndex].messages[this.contactsList[this.activeIndex].messages.length-1]


        },

        getLastMessages(contactList) {

            contactList.forEach(contact => {
                this.lastContactInfo.push(contact.messages[contact.messages.length - 1])
            });
        },

        scrollDown() {
            let chat = document.querySelector(".chat")

            let scrollHeight = chat.scrollHeight

            chat.scrollTop = scrollHeight
        }
    },

    mounted() {
        this.getLastMessages(this.contactsList)
    },

    updated() {
        this.scrollDown()
    }

}).mount('#app')