import React from "react";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class ImageUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ file, fileList }) => {
    console.log(file);
    console.log(fileList);
    this.setState({ fileList });

    const res = JSON.parse(file.response);
    console.log(res);
    if (file.status === 'done') {
      // Update local storage
      let user = JSON.parse(localStorage.getItem('user'));
      user.urlPhotoProfil = res.data.urlPhotoProfil;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <section >
        <Upload
          action={`${process.env.API_BASE_URL}/etudiants/update-photo`}
          name="photo"
          method="put"
          accept="image/png,image/jpeg"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          withCredentials={true}
          maxCount={1}
          progress={{
            // strokeColor: { '0%': '#108ee9', '100%': '#87d068'},
            strokeColor: { '0%': 'var(--primaryColor)', '100%': '#1890ff'},
            strokeWidth: 3,
            format: percent => `${percent}%`
            // format: percent => `${parseFloat(percent.toFixed(1))}%`
          }}
          
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="modal" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </section>
    );
  }
}

export default ImageUpload;