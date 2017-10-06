import React from 'react';
import { TextArea, Form } from 'semantic-ui-react';

const TextAreaLabel = ({
    labelName,
    onTextAreaChange,
    placeHolderName,
    TextAreaHeight,
    textAreaValue
}) => {
  return (
      <div className="input-label-row">
          <label className="input-label">
              {labelName}
          </label>
          <Form>
                <TextArea
                    style={{ minHeight: Number.parseInt(TextAreaHeight) }}
                    placeholder={placeHolderName}
                    onChange={onTextAreaChange}
                    value={textAreaValue}
                />
          </Form>
      </div>
  );
};
 
export default TextAreaLabel;