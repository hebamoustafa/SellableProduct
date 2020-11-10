import React, {PureComponent} from 'react';
import {Platform, View, Image, Text, TouchableOpacity} from 'react-native';
import NormalTextInput from '../../components/NormalTextInput';
import AutoComplete from '../../components/AutoComplete';
import ImagePicker from 'react-native-image-picker';
import CustomTextInput from '../../components/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import DatePicker from 'react-native-datepicker';
import Snackbar from 'react-native-snackbar';

export default class HomeComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getAllCategories();
    this.state = {
      title: '',
      selected_category: null,
      article: '',
      photo: null,
      description: '',
      price: '',
      discount: '0',
      price_after_disc: '',
      date:
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate(),
      fromDate: '',
      toDate: '',
    };
  }

  onChangeTitle = (text) => {
    this.setState({title: text});
  };

  onSelectCategory = (category) => {
    this.setState({selected_category: category});
  };

  onChangeArticleName = (text) => {
    this.setState({article: text});
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  onChangeDescription = (description) => {
    this.setState({description: description});
  };

  onChangePrice = (price) => {
    this.setState({price: price});
    if (this.props.discount > 0) {
      var disc_price = (price * this.props.discount) / 100;
      this.setState({price_after_disc: (price - disc_price).toString()});
    } else {
      this.setState({price_after_disc: price});
    }
  };

  handleDiscount = (type) => {
    var newDisc = 0;
    if (type === '+') {
      this.props.onIncreamentDiscount(1);
      newDisc= this.props.discount + 1;
    } else {
      if (this.props.discount > 0) {
        this.props.onDecreamentDiscount(1);
        newDisc= this.props.discount - 1;
      }
    }
    if (this.state.price.trim() !== '') {
      if (newDisc === 0) {
        this.setState({price_after_disc: this.state.price});
      } else {
        this.setState({
          price_after_disc: (
            parseFloat(this.state.price) -
            this.state.price * (newDisc / 100)
          ).toString(),
        });
      }
    }
  };

  showSnakbar = (text) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_LONG,
    });
  };
  
  save = () => {
    if(this.state.selected_category !== null && this.state.fromDate !== '' &&
      this.state.toDate !== '' && this.state.photo !== null && this.state.description !== '' &&
      this.state.price !== '') {
        // save
      } else {
        if (this.state.selected_category === null) {
          this.showSnakbar('Please Select Category');
          return;
        }
        if (this.state.photo === null) {
          this.showSnakbar('Please Upload Image');
          return;
        }
        if (this.state.description === '') {
          this.showSnakbar('Please Enter Description');
          return;
        }
        if (this.state.price === '') {
          this.showSnakbar('Please Enter Price');
          return;
        }
        if (this.state.fromDate === '' || this.state.toDate === '') {
          this.showSnakbar('Please Select Availabilty Period');
          return;
        }
      }
  };

  render() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.wrapper}>
          {/* Title */}
          <NormalTextInput
            title={this.state.title}
            placeholder={'Add Title'}
            callback={this.onChangeTitle.bind(this)}
          />
          {/* Category */}
          <AutoComplete
            style={{marginTop: 50}}
            placeholder={'Category'}
            data={this.props.categories_list}
            callback={this.onSelectCategory.bind(this)}
          />
          {/* Article */}
          <NormalTextInput
            style={{marginTop: 50}}
            title={this.state.article}
            placeholder={'Article Name'}
            callback={this.onChangeArticleName.bind(this)}
          />
          {/* Upload Image */}
          <View style={styles.uploadImageWrapper}>
            <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
              <Image
                source={
                  this.state.photo === null || this.state.photo === undefined
                    ? require('../../images/upload_image.png')
                    : {uri: this.state.photo.uri}
                }
                style={styles.imgUploadStyle}
              />
            </TouchableOpacity>
            <Text style={styles.txtUploadImageStyle}>Upload Image</Text>
          </View>
          {/* Available Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={styles.lblStyle}>Available Quantity:</Text>
            <View style={styles.rowStyle}>
              <TouchableOpacity onPress={() => this.props.onIncreamentQuantity(1)}>
                <Text style={styles.quantityControlStyle}>+</Text>
              </TouchableOpacity>
              <CustomTextInput
                style={{
                  width: 70,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                txtInputStyle={{color: '#000000'}}
                value={this.props.quantity.toString()}
                placeholder={''}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => this.props.quantity > 1 ? this.props.onDecreamentQuantity(1) : null}>
                <Text style={styles.quantityControlStyle}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Description */}
          <View style={{marginTop: 40}}>
            <Text style={styles.lblStyle}>Description</Text>
            <CustomTextInput
              style={{height: 100, marginTop: 10}}
              value={this.state.description}
              placeholder={'Description'}
              callback={this.onChangeDescription.bind(this)}
            />
          </View>
          {/* Price */}
          <View style={styles.priceContainer}>
            <View style={{alignItems: 'center'}}>
              <Text>Initial Price</Text>
              <CustomTextInput
                style={{
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}
                value={this.state.price}
                placeholder={''}
                keyboardType={'numeric'}
                callback={this.onChangePrice.bind(this)}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#477569'}}>Discount</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.handleDiscount.bind(this, '+')}>
                  <Text style={styles.quantityControlStyle}>+</Text>
                </TouchableOpacity>
                <CustomTextInput
                  style={{
                    width: 60,
                    marginHorizontal: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
                  txtInputStyle={{color: '#477569'}}
                  value={this.props.discount.toString()}
                  placeholder={''}
                  percentage={true}
                  editable={false}
                />
                <TouchableOpacity onPress={this.handleDiscount.bind(this, '-')}>
                  <Text style={styles.quantityControlStyle}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>Price after Discount</Text>
              <CustomTextInput
                style={{
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}
                value={this.state.price_after_disc}
                placeholder={''}
                editable={false}
              />
            </View>
          </View>
          {/* Availabilty Period */}
          <View style={styles.periodContainer}>
            <Text style={styles.txtPeriodStyle}>Availabilty Period</Text>
            <DatePicker
              style={{width: 36}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  color: '#ffffff',
                },
              }}
              onDateChange={(date) => {this.setState({fromDate: date})}}
            />
            <Text style={[styles.txtPeriodStyle, {marginLeft: 15}]}>to</Text>
            <DatePicker
              style={{width: 36}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  color: '#ffffff',
                },
              }}
              onDateChange={(date) => {this.setState({toDate: date})}}
            />
          </View>
          {/* Save */}
          <View style={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity onPress={() => this.save()}>
              <Image
                source={require('../../images/save.png')}
                style={styles.imgSaveStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: Platform.OS === 'ios' ? 40 : 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  lblStyle: {
    fontSize: 16,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  quantityControlStyle: {
    fontSize: 30,
  },
  imgUploadStyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  txtUploadImageStyle: {
    fontSize: 16,
    color: '#477569',
    marginTop: 10,
  },
  uploadImageWrapper: {
    alignItems: 'center',
    marginTop: 50,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  periodContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtPeriodStyle: {
    fontSize: 16,
    marginRight: 15,
  },
  imgPeriod: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  imgSaveStyle: {
    width: 50,
    height: 50,
  },
};
