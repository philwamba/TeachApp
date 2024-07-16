import React, { useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMCQs } from '@/redux/reducers/mcqReducer';
import { RootState, AppDispatch } from '@/redux/store';
import MCQCard from './MCQCard';
import { removeDuplicates } from '@/utils/removeDuplicates';
import { reset } from '@/redux/reducers/timerSlice';

const { height } = Dimensions.get('window');

const MCQFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector((state: RootState) => state.mcqs.questions);
  const status = useSelector((state: RootState) => state.mcqs.status);
  const [page, setPage] = React.useState<number>(1);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      dispatch(reset());
    }
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMCQs(page));
    }
  }, [status, page, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && page > 1) {
      dispatch(fetchMCQs(page));
    }
  }, [page, dispatch]);

  const loadMoreQuestions = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    return status === 'loading' ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  const uniqueQuestions = removeDuplicates(questions);

  return (
    <FlatList
      data={uniqueQuestions}
      renderItem={({ item }) => <MCQCard question={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreQuestions}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={height}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default MCQFeed;
