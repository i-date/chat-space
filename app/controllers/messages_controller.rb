class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @messages = latest_message_params.present? ? @group.messages.where("id > ?", latest_message_params[:latest_message_id]).includes(:user) : @group.messages.includes(:user)
    @members = group_member(@group)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージが送信されました" }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def latest_message_params
    params.permit(:latest_message_id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def group_member(group)
    members = []
    group.users.each do |member|
      members << member.name
    end
    members = members.join(", ")
  end

end
