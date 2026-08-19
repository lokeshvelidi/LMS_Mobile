import React from "react";
import {StyleSheet,Text,View} from "react-native";
const accents={blue:"#2F66E5",green:"#20A34A",yellow:"#F2A900",purple:"#7A5BC7",red:"#D9534F"};
const ClientStatCard=({label,value,prefix="",accent="blue"})=><View style={styles.card}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{prefix}{value}</Text><View style={[styles.decoration,{backgroundColor:accents[accent]||accents.blue}]}/></View>;
const styles=StyleSheet.create({card:{flex:1,minWidth:180,minHeight:118,padding:18,borderRadius:18,backgroundColor:"#FAF7EF",borderWidth:1,borderColor:"#E1DDD4",overflow:"hidden"},label:{fontSize:10,lineHeight:14,fontWeight:"700",color:"#61738A",letterSpacing:.6,textTransform:"uppercase"},value:{marginTop:12,fontSize:26,lineHeight:32,fontWeight:"700",color:"#19324D"},decoration:{position:"absolute",right:-18,bottom:-18,width:62,height:62,borderRadius:31,opacity:.18}});export default ClientStatCard;
