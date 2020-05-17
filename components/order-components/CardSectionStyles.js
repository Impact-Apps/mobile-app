import {
    StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
container: {
    marginTop: 50,
},
bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
},
red: {
    color: 'red',
},
StripeElement: {
    height:"40px",
    padding:"10px 12px",
    width:"100%",
    color:"#32325d",
    backgroundColor:"white",
    border:"1px solid transparent",
    borderRadius:"4px",
    boxShadow:"0 1px 3px 0 #e6ebf1",
    WebkitTransition:"box-shadow 150ms ease",
    transition:"box-shadow 150ms ease"
},
StripeElement__focus: {
    boxShadow:"0 1px 3px 0 #cfd7df"
},
StripeElement__invalid:{
    borderColor:"#fa755a"
},
StripeElement__webkit_autofill:{
    backgroundColor:"#fefde5 !important"
}
});
