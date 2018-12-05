require 'rails_helper'
describe Message do
  describe "#create" do
    context "can save" do

      it "is valid with body and image" do
        message = build(:message)
        expect(message).to be_valid
      end

      it "is valid with only body" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "is valid with only image" do
        message = build(:message, body: nil)
        expect(message).to be_valid
      end
    end

    context "can not save" do

      it "is invalid without body and image" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
