import React from "react";
import {Button, Col, Empty, Input, Row, Space} from "antd";

const Choices = ({list, handleDelete, createChoice, onChoiceChange}) => {
    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <label>Choices</label>
            {list.length ? (
                list.map((choice, index) => {
                    return (
                        <Row gutter={8}>
                            <Col>
                                <p>Title</p>
                                <Input
                                    name="title"
                                        value={choice.title}
                                        onChange={(event) => {
                                        onChoiceChange(
                                            "title",
                                            event.target.value,
                                            index,
                                        );
                                    }}
                                />
                            </Col>
                            <Col>
                                <p>Key</p>
                                <Input
                                    name="key"
                                    value={choice.key}
                                    onChange={(event) => {
                                        onChoiceChange(
                                            "key",
                                            event.target.value,
                                            index,
                                        );
                                    }}
                                />
                            </Col>
                            <Col>
                                <Button style={{marginTop : "35px"}} danger={true} onClick={() => handleDelete(choice)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    );
                })
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            )}
            {createChoice && (
                <Row justify="end">
                    <Col>
                        <Button onClick={createChoice} type="primary">
                            Create
                        </Button>
                    </Col>
                </Row>
            )}
        </Space>
    );
};

export default Choices;
