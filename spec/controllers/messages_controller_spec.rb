require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe "GET #index" do
    context "log in" do
      before do
        login_user(user)
        get :index, params: { group_id: group }
      end

      it "assign @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assign @group" do
        expect(assigns(:group)).to eq group
      end

      it "renders the :index template" do
        expect(response).to render_template :index
      end
    end

    context "not log in" do
      before do
        get :index, params: { group_id: group }
      end

      it "redirects to new_user_settion_path" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
