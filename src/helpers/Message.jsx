import { Report, Notify } from 'notiflix';

const styles = {
  with: '350px',
  svgSize: '100px',
  titleFontSize: '20px',
  buttonFontSize: '20px',
  borderRadius: '10px',
};

Report.init({
  plainText: false,
  titleMaxLength: 100,
});

class Message {
  warning(warning, text, buttonText) {
    return Report.warning(warning, text, buttonText, styles)
  };

  error(error, text, buttonText) {
    return Report.failure(error, text, buttonText, styles)
  };

  success(text) {
    return Notify.success(text)
  };
}

export default new Message();