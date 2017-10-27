import React from 'react';
import InsertLabel from 'components/common/Label/InsertLabel';
import { TextArea, Form } from 'semantic-ui-react';

const TextAreaLabel = ({
    labelName,
    onTextAreaChange,
    placeHolderName,
    TextAreaHeight,
    textAreaValue
}) => {
  return (
          <InsertLabel
              labelName={labelName}>
              <Form>
                <TextArea
                    style={{ minHeight: Number.parseInt(TextAreaHeight,10) }}
                    placeholder={placeHolderName}
                    onChange={onTextAreaChange}
                    value={textAreaValue}
                />
              </Form>
          </InsertLabel>
  );
};
 
export default TextAreaLabel;