import pandas as pd

#Read the csv into a Pandas DataFrame
data = pd.read_csv('./main_dataset.csv')

data = data.dropna(subset=['author', 'format'], how ='any')
data = data.drop(['image','currency','old_price'], axis=1)

categories_to_keep = [
    'Business-Finance-Law', 'Science-Fiction-Fantasy-Horror', 'Health',
    'Crime-Thriller', 'Childrens-Books', 'History-Archaeology', 'Technology-Engineering', 'Romance'
]
data = data[data['category'].isin(categories_to_keep)]

# data['price'] = data['price'].apply(lambda x: ''.join(filter(str.isdigit, x)) if not x.replace('.', '', 1).isdigit() else x)
data['price'] = data['price'].apply(lambda x: x.replace('US$', '').strip())
# Convert price to float for uniformity
data['price'] = data['price'].astype(float)

print(data['category'].unique())
print(data['format'].unique())
print(data['format'].value_counts())
# print(data['category'].value_counts())
# print(data.shape)
# print(data.isnull().sum())
# data.to_csv("books2.csv", index=False)