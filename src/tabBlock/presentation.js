import React from 'react';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import style from './style';

const TabBlockPresentation = ({
  classes,
  theme,
  tabs,
  value,
  openModal,
  closeModal,
  handleChange,
  handleChangeIndex
}) => {
  const ImageModal = ({ t }) => (
    <img
      onClick={() => closeModal('dialog', t.name)}
      alt={`${t.name} content`}
      src={t.imageContent}
      className={classes.modalImage}
    />
  );

  const ImageContent = ({ t }) => (
    <div>
      {t.imageNotFound && (
        <Typography style={{ textAlign: 'center', color: 'tomato' }}>
          ♬ Well, your link, it.... SEEMS TO BE BROKEN ♬
        </Typography>
      )}
      <div className={classes.imageContainer}>
        <img
          onClick={() =>
            openModal('dialog', {
              hideTitle: true,
              title: t.name,
              element: <ImageModal t={t} />
            })
          }
          src={t.imageContent}
          onError={() => {
            t.imageContent =
              'https://media.giphy.com/media/l1J9BcdrS1tnmmNUs/giphy.gif';
            t.imageNotFound = true;
          }}
          alt={`${t.name} content`}
          className={classes.image}
        />
      </div>
    </div>
  );

  return (
    <Paper className={classes.root} elevation={0}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          fullWidth
        >
          {tabs.map(t => <Tab key={t.name} label={t.name} />)}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map(t => (
          <div dir={theme.direction} key={t.name} className={classes.card}>
            <div className={classes.textContent}>
              {t.textContent &&
                t.textContent.split(/\n/g).map((text, index) => (
                  <Typography
                    key={`line-${index}`}
                    color="textSecondary"
                    className={classes.textLine}
                  >
                    {text}
                  </Typography>
                ))}
            </div>
            {t.imageContent && <ImageContent t={t} />}
          </div>
        ))}
      </SwipeableViews>
    </Paper>
  );
};

export default withStyles(style, { withTheme: true })(TabBlockPresentation);
