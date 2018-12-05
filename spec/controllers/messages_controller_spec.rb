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

    describe "Post #crate" do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context "log in" do
      before do
        login_user(user)
      end

      context "can save" do
        subject {
          post :create, params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create, params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context "not log in" do
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
