import "moment/locale/de";

import { Input } from "antd";

import React, { useEffect, useState } from "react";
import { IBaseEntity, useSetEditorContext } from "./lib";

// import styles from './testEditor.module.scss';

const { TextArea } = Input;

export interface ITestItem extends IBaseEntity {
  subject: string;
  description: string;
}

interface ITestEditorProps {
  item: ITestItem;
}

export const TestEditor: React.FC<ITestEditorProps> = (props) => {
  const [itemState, setItemState] = useState<ITestItem>(props.item);
  const setEditorContext = useSetEditorContext();
  const onValidate = (): boolean => {
    if (itemState.subject !== undefined) {
      return itemState.subject.length > 0;
    }
    return false;
  };

  useEffect(() => {
    setEditorContext({
      item: { ...itemState, isDirty: true },
      isValid: onValidate(),
    });
  }, [itemState]);

  const onSubjectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setItemState({
      ...itemState,
      isDirty: true,
      subject: event.currentTarget.value,
    });
  };

  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setItemState({
      ...itemState,
      isDirty: true,
      description: event.currentTarget.value,
    });
  };

  return (
    <>
      <div>
        <div>Subject</div>
        <div>
          <Input
            size="large"
            title={"Subject"}
            defaultValue={itemState.subject}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              onSubjectChange(event)
            }
          />
        </div>
      </div>
      <div>
        <div>Description</div>
        <div>
          <TextArea
            rows={5}
            size="large"
            title={"Subject"}
            defaultValue={itemState.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
              onDescriptionChange(event)
            }
          />
        </div>
      </div>
    </>
  );
};

export default TestEditor;
