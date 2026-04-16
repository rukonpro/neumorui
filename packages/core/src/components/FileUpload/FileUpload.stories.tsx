import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUpload, type UploadedFile } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Single: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: 440 }}>
        <FileUpload
          value={files}
          onChange={setFiles}
          hint="PNG, JPG up to 5 MB"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
        />
      </div>
    );
  },
};

export const MultipleImages: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: 440 }}>
        <FileUpload
          value={files}
          onChange={setFiles}
          multiple
          maxFiles={5}
          accept="image/*"
          label="Drop up to 5 images"
          hint="Images are previewed inline"
        />
      </div>
    );
  },
};

export const AnyFile: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: 440 }}>
        <FileUpload
          value={files}
          onChange={setFiles}
          multiple
          label="Upload documents"
          hint="Any file type, no size limit"
        />
      </div>
    );
  },
};
