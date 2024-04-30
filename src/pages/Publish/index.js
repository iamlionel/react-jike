import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getArticleById, publishAPI, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    const navigate = useNavigate()
    const { channelList } = useChannel()

    const onFinish = async (formValue) => {
        console.log(formValue);
        if (imageList.length !== imageType)
            return message.warning('封面类型和图片数量不匹配')
        const { channel_id, content, title } = formValue
        const params = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            },
            channel_id,
        }
        if (articleId) {
            await updateArticleAPI({ ...params, id: articleId })
            message.success('Update Success')
            navigate('/article')
        } else {
            await publishAPI(params)
            message.success('Publish Success')
        }
    }

    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        console.log(info)
        setImageList(info.fileList)
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log(e.target.value)
        setImageType(e.target.value)
    }

    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    const [form] = Form.useForm()
    useEffect(() => {
        console.log(articleId);
        async function getArticleDetail() {
            const res = await getArticleById(articleId)
            const data = res.data
            const { cover } = data
            form.setFieldsValue({
                ...data,
                type: data.cover.type
            })

            setImageType(cover.type)
            setImageList(cover.images.map(url => {
                return { url }
            }))
        }
        if (articleId) {
            getArticleDetail()
        }
    }, [articleId, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑' : '发布'}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                listType="picture-card"
                                name='image'
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                showUploadList
                                maxCount={imageType}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill className='publish-quill' theme='snow' placeholder='请输入文章内容' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish