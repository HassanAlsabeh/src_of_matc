/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import countries from '../../../provider/countries.json';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import Image from "react-native-scalable-image";
import {Input} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class CountryCodePicker extends React.Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
  };
  countries: [] = [];
  flags: [] = [];

  //
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      modalVisible: false,
      animationType: 'slide',
      selectedCountry: {},
      inSearch: false,
    };
    this.loadFlags();

    // this.countries.slice()
    // console.log(countries.length);
  }

  componentDidMount() {
    this.loadCountries();
    this.setState({
      data: this.countries[0],
      currentIndex: 0,
    });
    if (this.props.selectedCountry) {
      let selectedCountry = countries.filter(item => {
        return item.iso2 === this.props.selectedCountry;
      })[0];
      this.setState({
        selectedCountry: selectedCountry,
      });
      // Alert.alert('info', 'Selected Country ' + selectedCountry.name);
    } else {
      this.setState({
        selectedCountry: countries[0],
      });
    }
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //     this.close();
    //     return 1;
    // });
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    const {loaded} = this.state;
    return (
      <View style={this.props.containerStyle}>
        <Modal
          transparent
          ref={ref => {
            this.modal = ref;
          }}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.close();
          }}
          animationType={this.state.animationType}>
          {this.renderCountries()}
        </Modal>
        {this.renderInput()}
      </View>
    );
  }

  renderCountries() {
    const {data} = this.state;
    return (
      <View
        style={{
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 45 : 0,
          // marginTop: '10%',
          // marginLeft: '10%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // borderRadius: 5,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.75)',
            // borderRadius: 5,
            width: '100%',
          }}>
          {this.renderSearchBar()}
          <FlatList
            style={{
              paddingHorizontal: 10,
            }}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              {
                return this.renderCountry(item);
              }
            }}
            keyExtractor={(item, index) => item.iso2}
            onEndReached={() => {
              if (!this.state.inSearch) {
                this.loadMore();
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.close();
            }}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2e8bcb',
              color: 'white',
              borderRadius: 5,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCountry(country) {
    // const url = require(uri);
    // console.log(url);
    let uri = require('../../../assets/images/icons/padlock.png'); //require('../../../assets/images/icons/activeDoctors.png');//this.flags[country.iso2];
    if (this.flags[country.iso2]) {
      uri = this.flags[country.iso2];
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          paddingVertical: 5,
          // justifyContent: 'space-between'
        }}
        onPress={() => {
          this.props.onCountrySelected(country);
          this.setState({
            selectedCountry: country,
          });
          this.close();
        }}>
        <View
          style={{
            paddingTop: 2,
            marginHorizontal: 4,
            alignItems: 'center',
          }}>
          <Image //width={20} height={20}
            style={{width: 22, height: 15}}
            source={uri}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
            }}>
            +{country.dialCode} {country.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderInput() {
    const {selectedCountry} = this.state;
    let uri = require('../../../assets/images/icons/padlock.png'); //require('../../../assets/images/icons/activeDoctors.png\'');//this.flags[country.iso2];
    if (this.flags[selectedCountry.iso2]) {
      uri = this.flags[selectedCountry.iso2];
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.openModal();
        }}
        style={{
          flexDirection: this.props.direction === 'ltr' ? 'row' : 'row-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          // padding: '1%',
          // margin: '1%'
        }}>
        <View
          style={[
            {
              paddingTop: 2,
              marginHorizontal: 4,
              alignItems: 'center',
            },
            this.props.inputStyle,
          ]}>
          <Image //width={20} height={20}
            style={{
              width: Platform.isPad ? 36 : 20,
              height: Platform.isPad ? 26 : 15,
            }}
            source={uri}
          />
        </View>
        <View
          style={[
            {
              // paddingTop: 2,
              // marginHorizontal:,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: Platform.isPad?18:10.5,
              marginLeft: 5,
              paddingRight: 3,
            },
            this.props.inputTextStyle,
          ]}>
          <Text
            style={{
              // height: 45,
              color: 'rgb(150,150,150)',
              fontSize: Platform.isPad ? 22 : 16,
            }}>
            +{selectedCountry.dialCode}
            {/*{selectedCountry.name}*/}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderLoading() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="grey" size="large" />
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View>
        <Input
          placeholder={'Search Country'}
          inputStyle={{
            color: 'white',
          }}
          autoFocus
          placeholderTextColor={'white'}
          onChangeText={text => {
            this.doSearch(text);
          }}
        />
      </View>
    );
  }

  loadMore() {
    this.setState({
      loaded: false,
    });
    const {data, currentIndex} = this.state;
    if (currentIndex + 1 >= this.countries.length) {
      return false;
    } else {
      this.setState({
        data: [...data, ...this.countries[currentIndex + 1]],
        currentIndex: currentIndex + 1,
        loaded: true,
      });
    }
  }

  close() {
    try {
      this.setState({
        modalVisible: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  openModal() {
    this.setState({
      modalVisible: true,
      inSearch: false,
      data: this.countries[0],
    });
  }

  doSearch(text: string) {
    let txt = text.toLowerCase();
    if (text.length >= 2) {
      let newData = countries.filter(item => {
        return (
          (item.iso2 + '').toLowerCase().indexOf(txt) > -1 ||
          (item.name + '').toLowerCase().indexOf(txt) > -1 ||
          (item.dialCode + '').toLowerCase().indexOf(txt) > -1
        );
      });
      this.setState({
        data: newData,
        inSearch: true,
      });
    } else {
      this.setState({
        data: this.countries[0],
        inSearch: false,
      });
    }
  }

  loadCountries() {
    const perChunk = 24;

    this.countries = countries.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    this.setState({
      loaded: true,
    });
  }

  loadFlags() {
    this.flags = {
      ad: require('./images/ad.png'),
      ae: require('./images/ae.png'),
      af: require('./images/af.png'),
      ag: require('./images/ag.png'),
      ai: require('./images/ai.png'),
      al: require('./images/al.png'),
      am: require('./images/am.png'),
      ao: require('./images/ao.png'),
      ar: require('./images/ar.png'),
      as: require('./images/as.png'),
      at: require('./images/at.png'),
      au: require('./images/au.png'),
      aw: require('./images/aw.png'),
      ax: require('./images/ax.png'),
      az: require('./images/az.png'),
      ba: require('./images/ba.png'),
      bb: require('./images/bb.png'),
      bd: require('./images/bd.png'),
      be: require('./images/be.png'),
      bf: require('./images/bf.png'),
      bg: require('./images/bg.png'),
      bh: require('./images/bh.png'),
      bi: require('./images/bi.png'),
      bj: require('./images/bj.png'),
      bl: require('./images/bl.png'),
      bm: require('./images/bm.png'),
      bn: require('./images/bn.png'),
      bo: require('./images/bo.png'),
      bq: require('./images/bq.png'),
      br: require('./images/br.png'),
      bs: require('./images/bs.png'),
      bt: require('./images/bt.png'),
      bw: require('./images/bw.png'),
      by: require('./images/by.png'),
      bz: require('./images/bz.png'),
      ca: require('./images/ca.png'),
      cc: require('./images/cc.png'),
      cd: require('./images/cd.png'),
      cf: require('./images/cf.png'),
      cg: require('./images/cg.png'),
      ch: require('./images/ch.png'),
      ci: require('./images/ci.png'),
      ck: require('./images/ck.png'),
      cl: require('./images/cl.png'),
      cm: require('./images/cm.png'),
      cn: require('./images/cn.png'),
      co: require('./images/co.png'),
      cr: require('./images/cr.png'),
      cu: require('./images/cu.png'),
      cv: require('./images/cv.png'),
      cw: require('./images/cw.png'),
      cx: require('./images/cx.png'),
      cy: require('./images/cy.png'),
      cz: require('./images/cz.png'),
      de: require('./images/de.png'),
      dj: require('./images/dj.png'),
      dk: require('./images/dk.png'),
      dm: require('./images/dm.png'),
      do: require('./images/do.png'),
      dz: require('./images/dz.png'),
      ec: require('./images/ec.png'),
      ee: require('./images/ee.png'),
      eg: require('./images/eg.png'),
      eh: require('./images/eh.png'),
      er: require('./images/er.png'),
      es: require('./images/es.png'),
      et: require('./images/et.png'),
      fi: require('./images/fi.png'),
      fj: require('./images/fj.png'),
      fk: require('./images/fk.png'),
      fm: require('./images/fm.png'),
      fo: require('./images/fo.png'),
      fr: require('./images/fr.png'),
      ga: require('./images/ga.png'),
      gb: require('./images/gb.png'),
      gd: require('./images/gd.png'),
      ge: require('./images/ge.png'),
      gf: require('./images/gf.png'),
      gg: require('./images/gg.png'),
      gh: require('./images/gh.png'),
      gi: require('./images/gi.png'),
      gm: require('./images/gm.png'),
      gn: require('./images/gn.png'),
      gp: require('./images/gp.png'),
      gq: require('./images/gq.png'),
      gr: require('./images/gr.png'),
      gt: require('./images/gt.png'),
      gu: require('./images/gu.png'),
      gw: require('./images/gw.png'),
      gy: require('./images/gy.png'),
      hk: require('./images/hk.png'),
      hn: require('./images/hn.png'),
      hr: require('./images/hr.png'),
      ht: require('./images/ht.png'),
      hu: require('./images/hu.png'),
      id: require('./images/id.png'),
      ie: require('./images/ie.png'),
      il: require('./images/il.png'),
      im: require('./images/im.png'),
      in: require('./images/in.png'),
      io: require('./images/io.png'),
      iq: require('./images/iq.png'),
      ir: require('./images/ir.png'),
      is: require('./images/is.png'),
      it: require('./images/it.png'),
      je: require('./images/je.png'),
      jm: require('./images/jm.png'),
      jo: require('./images/jo.png'),
      jp: require('./images/jp.png'),
      ke: require('./images/ke.png'),
      kg: require('./images/kg.png'),
      kh: require('./images/kh.png'),
      ki: require('./images/ki.png'),
      km: require('./images/km.png'),
      kn: require('./images/kn.png'),
      kp: require('./images/kp.png'),
      kr: require('./images/kr.png'),
      ks: require('./images/ks.png'),
      kw: require('./images/kw.png'),
      ky: require('./images/ky.png'),
      kz: require('./images/kz.png'),
      la: require('./images/la.png'),
      lb: require('./images/lb.png'),
      lc: require('./images/lc.png'),
      li: require('./images/li.png'),
      lk: require('./images/lk.png'),
      lr: require('./images/lr.png'),
      ls: require('./images/ls.png'),
      lt: require('./images/lt.png'),
      lu: require('./images/lu.png'),
      lv: require('./images/lv.png'),
      ly: require('./images/ly.png'),
      ma: require('./images/ma.png'),
      mc: require('./images/mc.png'),
      md: require('./images/md.png'),
      me: require('./images/me.png'),
      mf: require('./images/mf.png'),
      mg: require('./images/mg.png'),
      mh: require('./images/mh.png'),
      mk: require('./images/mk.png'),
      ml: require('./images/ml.png'),
      mm: require('./images/mm.png'),
      mn: require('./images/mn.png'),
      mo: require('./images/mo.png'),
      mp: require('./images/mp.png'),
      mq: require('./images/mq.png'),
      mr: require('./images/mr.png'),
      ms: require('./images/ms.png'),
      mt: require('./images/mt.png'),
      mu: require('./images/mu.png'),
      mv: require('./images/mv.png'),
      mw: require('./images/mw.png'),
      mx: require('./images/mx.png'),
      my: require('./images/my.png'),
      mz: require('./images/mz.png'),
      na: require('./images/na.png'),
      nc: require('./images/nc.png'),
      ne: require('./images/ne.png'),
      nf: require('./images/nf.png'),
      ng: require('./images/ng.png'),
      ni: require('./images/ni.png'),
      nl: require('./images/nl.png'),
      no: require('./images/no.png'),
      np: require('./images/np.png'),
      nr: require('./images/nr.png'),
      nu: require('./images/nu.png'),
      nz: require('./images/nz.png'),
      om: require('./images/om.png'),
      pa: require('./images/pa.png'),
      pe: require('./images/pe.png'),
      pf: require('./images/pf.png'),
      pg: require('./images/pg.png'),
      ph: require('./images/ph.png'),
      pk: require('./images/pk.png'),
      pl: require('./images/pl.png'),
      pm: require('./images/pm.png'),
      pr: require('./images/pr.png'),
      ps: require('./images/ps.png'),
      pt: require('./images/pt.png'),
      pw: require('./images/pw.png'),
      py: require('./images/py.png'),
      qa: require('./images/qa.png'),
      re: require('./images/re.png'),
      ro: require('./images/ro.png'),
      rs: require('./images/rs.png'),
      ru: require('./images/ru.png'),
      rw: require('./images/rw.png'),
      sa: require('./images/sa.png'),
      sb: require('./images/sb.png'),
      sc: require('./images/sc.png'),
      sd: require('./images/sd.png'),
      se: require('./images/se.png'),
      sg: require('./images/sg.png'),
      sh: require('./images/sh.png'),
      si: require('./images/si.png'),
      sj: require('./images/sj.png'),
      sk: require('./images/sk.png'),
      sl: require('./images/sl.png'),
      sm: require('./images/sm.png'),
      sn: require('./images/sn.png'),
      so: require('./images/so.png'),
      sr: require('./images/sr.png'),
      ss: require('./images/ss.png'),
      st: require('./images/st.png'),
      sv: require('./images/sv.png'),
      sx: require('./images/sx.png'),
      sy: require('./images/sy.png'),
      sz: require('./images/sz.png'),
      tc: require('./images/tc.png'),
      td: require('./images/td.png'),
      tg: require('./images/tg.png'),
      th: require('./images/th.png'),
      tj: require('./images/tj.png'),
      tk: require('./images/tk.png'),
      tl: require('./images/tl.png'),
      tm: require('./images/tm.png'),
      tn: require('./images/tn.png'),
      to: require('./images/to.png'),
      tr: require('./images/tr.png'),
      tt: require('./images/tt.png'),
      tv: require('./images/tv.png'),
      tw: require('./images/tw.png'),
      tz: require('./images/tz.png'),
      ua: require('./images/ua.png'),
      ug: require('./images/ug.png'),
      us: require('./images/us.png'),
      uy: require('./images/uy.png'),
      uz: require('./images/uz.png'),
      va: require('./images/va.png'),
      vc: require('./images/vc.png'),
      ve: require('./images/ve.png'),
      vg: require('./images/vg.png'),
      vi: require('./images/vi.png'),
      vn: require('./images/vn.png'),
      vu: require('./images/vu.png'),
      wf: require('./images/wf.png'),
      ws: require('./images/ws.png'),
      ye: require('./images/ye.png'),
      yt: require('./images/yt.png'),
      za: require('./images/za.png'),
      zm: require('./images/zm.png'),
      zw: require('./images/zw.png'),
    };
  }
}
