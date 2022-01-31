import React from "react";
import BaseScreen from "../../base/BaseScreen";
import {Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommonStyles, {deviceHeight, deviceWidth} from "../../global/styles/CommonStyles";
// import {FlatGrid} from "react-native-super-grid";
// import SpecialityBox from "../../components/SpecialityBox";
import Image from "react-native-scalable-image";
import {normalize} from "../../provider/Utils";
import I18n from "../../provider/TranslationProvider";

export default class SpecialitiesScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            doctorsList: [],
            specialityList: [],
            selectedDoctorID: '',
            search: '',
            pageWidth: deviceWidth,
            pageHeight: deviceHeight,
            isPortrait: true,
        };
    }

    async componentDidMount() {
        this.clearLoading();
        await this._loadSpecialities();
        this.setPageName(I18n.t('drawer.specialities'));
    }

    renderContent() {
        const {pageWidth, pageHeight, isPortrait} = this.state;
        return (
            <View onLayout={() => {
                const dim = Dimensions.get('screen');
                this.setState({
                    isPortrait: dim.height >= dim.width,
                    pageHeight: dim.height,
                    pageWidth: dim.width,
                })
            }}>
                <ScrollView

                    // horizontal={true}
                    style={{
                        minHeight: this.state.pageHeight,
                        maxHeight: this.state.pageHeight,
                        height: this.state.pageHeight,
                        // padding: 5,
                        // marginVertical: 20
                    }}
                    ref="_scrollView"
                    onContentSizeChange={content => {
                        this.setState({
                            scrollContent: content
                        })
                        // this.refs._scrollView.scrollTo({
                        //     x: content * 1000 * -1,
                        //     y: -content,
                        //     animated: true,
                        // });
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginVertical: '5%',
                        marginLeft: '2.5%',
                    }}>
                        {
                            this.state.specialityList.map((item, index) => {
                                return this.renderSpecialityBox(item);
                            })
                        }
                    </View>

                </ScrollView>


            </View>
        );
    }

    renderSpecialityBox(item) {
        const {pageWidth, pageHeight, isPortrait} = this.state;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.navigate(this.constants.FIND_DOCTOR_PAGE, {
                        specialityID: item.id, specialityName: item.name,
                    });
                }}>
                <View
                    key={item.id}
                    style={{
                        width: isPortrait ? (Platform.isPad ? pageWidth / 3.5 : pageWidth / 2.5) : (Platform.isPad ? pageWidth / 5 : pageWidth / 4),
                        height: isPortrait ? (Platform.isPad ? pageWidth / 3.5 : pageWidth / 2.5) : (Platform.isPad ? pageWidth / 5 : pageWidth / 4),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.background_color,
                        // marginHorizontal: '2%',
                        marginHorizontal: '2%',
                        marginVertical: '5%',
                        borderRadius: 30,
                    }}

                >
                    <View style={{
                        marginTop: -10
                    }}>
                        {item.image ?
                            <Image width={isPortrait ? pageWidth * 0.2 : pageWidth * 0.1}
                                   source={{uri: item.image}}/> : null}
                    </View>
                    <View style={{
                        paddingTop: '5%'
                    }}>
                        <Text style={[
                            CommonStyles.extraBold,
                            CommonStyles.boxTitleText,
                            {
                                fontSize: normalize(8),
                                color: 'white',
                                textTransform: 'uppercase',
                                textAlign: 'center'
                            }]}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    async _loadSpecialities() {
        let token = await this.getItem('user_token');
        await this.provider.initHeaders(token);
        this.provider.doctorSpecialties({}).then((response) => {
            this.hideLoading();
            if (!this.handleResponseStatus(response)) {
                return;
            }
            this.setState({
                specialityList: response.data ? response.data : []
            })
        }).catch((error) => {
            this.hideLoading();
            this.showErrorAlert(error.message);
        })
    }


}

const styles = StyleSheet.create({
    gridView: {
        //    marginTop: 20,
        flex: 1,
        marginBottom: 50,
    },
    resultTextBox: {
        flexDirection: 'row',
        marginBottom: -10,
        marginLeft: 15,
        marginRight: 15,
    },
    resultListBox: {
        flex: 1,
    },
});
