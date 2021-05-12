<template>
    <v-dialog persistent v-model="registerDialog">
        <v-btn primary accent slot="activator">
            Register
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Register for meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider>
                </v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>Change later</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat @click="registerDialog = false">Cancel</v-btn>
                            <v-btn flat @click="onAgree">Yes</v-btn>
                        </v-card-actions>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:["meetupId"],
    data(){
        return {
            registerDialog : false
        }
    },
    methods:{
        onAgree(){}
    },
    created(){
        console.log('Dialog');
    }
}
</script>